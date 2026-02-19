<?php
/**
 * Image Upload Handler
 * 
 * This is a placeholder script for handling image uploads.
 * In a real implementation, you would:
 * 1. Validate the uploaded file
 * 2. Process the image (resize, optimize, etc.)
 * 3. Save the image to the appropriate directory
 * 4. Update the database with the image information
 * 5. Return a response to the client
 */

// Set headers for JSON response
header('Content-Type: application/json');

// Check if file was uploaded
if (!isset($_FILES['file'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No file uploaded'
    ]);
    exit;
}

// Get file information
$file = $_FILES['file'];
$fileName = $file['name'];
$fileTmpName = $file['tmp_name'];
$fileSize = $file['size'];
$fileError = $file['error'];
$fileType = $file['type'];

// Get category and subcategory
$category = isset($_POST['category']) ? $_POST['category'] : 'uncategorized';
$subcategory = isset($_POST['subcategory']) ? $_POST['subcategory'] : 'all';

// Check for errors
if ($fileError !== 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Error uploading file'
    ]);
    exit;
}

// Check file size (5MB max)
if ($fileSize > 5 * 1024 * 1024) {
    echo json_encode([
        'success' => false,
        'message' => 'File size exceeds limit'
    ]);
    exit;
}

// Check file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($fileType, $allowedTypes)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid file type'
    ]);
    exit;
}

// Generate unique filename
$fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
$newFileName = uniqid() . '.' . $fileExt;

// Determine upload directory
$uploadDir = '../uploads/' . $category . '/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Upload path
$uploadPath = $uploadDir . $newFileName;

// In a real implementation, you would move the uploaded file
// move_uploaded_file($fileTmpName, $uploadPath);

// For demo purposes, we'll just return success
echo json_encode([
    'success' => true,
    'message' => 'File uploaded successfully',
    'data' => [
        'id' => uniqid(),
        'name' => $fileName,
        'path' => '/uploads/' . $category . '/' . $newFileName,
        'category' => $category,
        'subcategory' => $subcategory,
        'size' => $fileSize,
        'type' => $fileType,
        'date' => date('Y-m-d H:i:s')
    ]
]);
