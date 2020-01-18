<?php
    // Receive GET params & CAST to Int
    if (isset($_GET['num1'])) { $num1 = (int) $_GET['num1']; } 
    // Receive POST params & CAST to Int
    else if (isset($_POST['num1'])) { $num1 = (int) $_POST['num1']; } 
    // Default value
    else { $num1 = 50; } 

    if (isset($_GET['num2'])) { $num2 = (int) $_GET['num2']; } 
    else if (isset($_POST['num2'])) { $num2 = (int) $_POST['num2']; } 
    else { $num2 = 50; }

    if (isset($_GET['num3'])) { $num3 = (int) $_GET['num3']; } 
    else if (isset($_POST['num3'])) { $num3 = (int) $_POST['num3']; } 
    else { $num3 = 50; }
    
    if (isset($_GET['num4'])) { $num4 = (int) $_GET['num4']; } 
    else if (isset($_POST['num4'])) { $num4 = (int) $_POST['num4']; } 
    else { $num4 = 50; }

    // Calculate
    $sum = $num1 + $num2 + $num3 + $num4;
    $avg = ($sum / 4);
    $mult = $num1 * $num2 * $num3 * $num4;

    // Build the result array
    $a = array( 
        'sum' => $sum, 
        'avg' => $avg,
        'mult' => $mult             
    );
    // Set header
    header('Content-Type: application/json');

    // Echo the json object 
    echo json_encode($a);
