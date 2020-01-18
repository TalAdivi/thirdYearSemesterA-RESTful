<?php
    // GET parameters & Cast to Integer  
    $num1 = (int) $_POST['num1'];
    $num2 = (int) $_POST['num2'];
    $num3 = (int) $_POST['num3'];
    $num4 = (int) $_POST['num4'];
    
    $a = array( 
        'num1' => $num1, 
        'num2' => $num2,
        'num3' => $num3,
        'num4' => $num4                
    );
    
    header('Content-Type: application/json');
    echo json_encode($a);

