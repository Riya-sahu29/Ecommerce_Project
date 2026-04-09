from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from.serializers import UserSerializer, UserRegistrationSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import ParseError
from .models import Category, Product, Cart, CartItem, Order, OrderItem   
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def get_products(request):
    category_slug = request.GET.get('category')
    products = Product.objects.all()
    if category_slug:
        products = products.filter(category__slug=category_slug)
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, id):
    product = get_object_or_404(Product, id=id)   
    serializer = ProductSerializer(product, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()   
    serializer = CategorySerializer(categories, many=True, context={'request': request})
    return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    try:
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id is required'}, status=400)
        
        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)  
        if not created:
            item.quantity += 1
            item.save() 
        return Response({'message': 'Product added to cart', "cart":CartSerializer(cart).data})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    try:
        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
    except ParseError:
        return Response({'error': 'Unable to parse JSON. Send valid JSON with Content-Type application/json.'}, status=400)

    if not item_id or quantity is None:
        return Response({'error': 'item_id and quantity are required', 'received': request.data if hasattr(request, 'data') else None}, status=400)
    try:
        # Convert quantity to integer
        quantity = int(quantity)

        if quantity < 1:
            item = CartItem.objects.get(id=item_id)
            item.delete()
            return Response({'message': 'Item removed from cart'}, status=200)

        item = CartItem.objects.get(id=item_id)
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=404)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    
    if not item_id:
        return Response({'error': 'item_id is required'}, status=400)
    
    try:
        CartItem.objects.get(id=item_id).delete()
        return Response({'message': 'Product removed from cart'})
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method')

        # Validate Phone Number 
        if not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)
        
        # Get user's cart and items
        cart , created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum([item.product.price * item.quantity for item in cart.items.all()])

        order = Order.objects.create(user = request.user, name=name, address=address, phone=phone, payment_method=payment_method, total_amount=total)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order, 
                product=item.product, 
                quantity=item.quantity,
                price=item.product.price
                )
            
        cart.items.all().delete()
        return Response({'message': 'Order created successfully', 'order_id': order.id}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    try:
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'error': 'No cart found'}, status=400)
        
        cart.items.all().delete()
        return Response({'message': 'Cart cleared successfully'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response({"message": "User created successfully","user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

