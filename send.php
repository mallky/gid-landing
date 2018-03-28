<?php
if (isset($_POST['phone'])) {    
    $to  = "info@gidizhevsk.com";
    $subject = "Заказ звонка"; 
    $message = 'Телефон заказчика:'.$_POST['phone']; 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";

    mail($to, $subject, $message, $headers);
}
?>