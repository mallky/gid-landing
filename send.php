<?php
if (isset($_POST['phone'])) {    
    $to  = "info@gidizhevsk.com";
    $subject = "Заказ звонка"; 
    $message = 'Телефон заказчика:'.$_POST['phone']; 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";

    mail($to, $subject, $message, $headers);

// преобразуем массив в URL-кодированную строку
$vars = http_build_query($message);
// создаем параметры контекста
$options = array(
    'http' => array(  
                'method'  => 'POST',  // метод передачи данных
                'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок 
                'content' => $vars,  // переменные
            )  
);  
$context  = stream_context_create($options);  // создаём контекст потока
$result = file_get_contents('http://test.web/index.php', false, $context); //отправляем запрос
}
?>