<?php
    // GET parameters
    $num1 = (int) $_POST['num1'];
    $num2 = (int) $_POST['num2'];
    $num3 = (int) $_POST['num3'];
    $num4 = (int) $_POST['num4'];
    $func = $_POST['func'];

    // Calculate
    if ($func == 'sum') {
        $res = $num1 + $num2 + $num3 + $num4;
    } else if ($func == 'avg') {
        $res = ($num1 + $num2 + $num3 + $num4) / 4;
    } else if ($func == 'mult') {
        $res = $num1 * $num2 * $num3 * $num4;
    } else { return print('Error!') ; }

    // Build the result array
    $a = array( 'retVal' => $res );
    
    // Set header
    header('Content-Type: application/json');
    // header('Access-Control-Allow-Origin: *');

    // Echo the json object 
    echo json_encode($a);
