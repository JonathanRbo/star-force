<?php
// ========================================
// STAR FORCE - Cart API
// Endpoint para gerenciar carrinho de compras
// ========================================

session_start();
header('Content-Type: application/json');

// Inicializar carrinho se não existir
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Função para calcular total do carrinho
function calculateCartTotal() {
    $total = 0;
    foreach ($_SESSION['cart'] as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    return $total;
}

// Função para contar itens no carrinho
function getCartCount() {
    $count = 0;
    foreach ($_SESSION['cart'] as $item) {
        $count += $item['quantity'];
    }
    return $count;
}

// Obter ação da requisição
$action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : '');

switch ($action) {

    // ========================================
    // GET CART - Retorna todos os itens do carrinho
    // ========================================
    case 'get':
        echo json_encode([
            'success' => true,
            'cart' => $_SESSION['cart'],
            'total' => calculateCartTotal(),
            'count' => getCartCount()
        ]);
        break;

    // ========================================
    // ADD ITEM - Adiciona produto ao carrinho
    // ========================================
    case 'add':
        $productId = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
        $productName = isset($_POST['product_name']) ? $_POST['product_name'] : '';
        $productPrice = isset($_POST['product_price']) ? floatval($_POST['product_price']) : 0;
        $productImage = isset($_POST['product_image']) ? $_POST['product_image'] : '';
        $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;

        if ($productId && $productName && $productPrice) {
            // Verificar se produto já existe no carrinho
            $found = false;
            foreach ($_SESSION['cart'] as &$item) {
                if ($item['id'] == $productId) {
                    $item['quantity'] += $quantity;
                    $found = true;
                    break;
                }
            }

            // Se não existe, adicionar novo
            if (!$found) {
                $_SESSION['cart'][] = [
                    'id' => $productId,
                    'name' => $productName,
                    'price' => $productPrice,
                    'image' => $productImage,
                    'quantity' => $quantity
                ];
            }

            echo json_encode([
                'success' => true,
                'message' => 'Produto adicionado ao carrinho',
                'cart' => $_SESSION['cart'],
                'total' => calculateCartTotal(),
                'count' => getCartCount()
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Dados do produto inválidos'
            ]);
        }
        break;

    // ========================================
    // UPDATE QUANTITY - Atualiza quantidade de um item
    // ========================================
    case 'update':
        $productId = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
        $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 0;

        if ($productId && $quantity > 0) {
            foreach ($_SESSION['cart'] as &$item) {
                if ($item['id'] == $productId) {
                    $item['quantity'] = $quantity;
                    break;
                }
            }

            echo json_encode([
                'success' => true,
                'message' => 'Quantidade atualizada',
                'cart' => $_SESSION['cart'],
                'total' => calculateCartTotal(),
                'count' => getCartCount()
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Dados inválidos'
            ]);
        }
        break;

    // ========================================
    // REMOVE ITEM - Remove produto do carrinho
    // ========================================
    case 'remove':
        $productId = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;

        if ($productId) {
            $_SESSION['cart'] = array_values(array_filter($_SESSION['cart'], function($item) use ($productId) {
                return $item['id'] != $productId;
            }));

            echo json_encode([
                'success' => true,
                'message' => 'Produto removido do carrinho',
                'cart' => $_SESSION['cart'],
                'total' => calculateCartTotal(),
                'count' => getCartCount()
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'ID do produto inválido'
            ]);
        }
        break;

    // ========================================
    // CLEAR CART - Limpa todo o carrinho
    // ========================================
    case 'clear':
        $_SESSION['cart'] = [];

        echo json_encode([
            'success' => true,
            'message' => 'Carrinho limpo',
            'cart' => [],
            'total' => 0,
            'count' => 0
        ]);
        break;

    // ========================================
    // DEFAULT - Ação inválida
    // ========================================
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Ação inválida'
        ]);
        break;
}
