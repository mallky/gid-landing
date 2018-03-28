<?php
if (isset($_POST['phone'])) {    
    $to  = "info@gidizhevsk.com";
    $subject = "Заказ звонка"; 
    $message = 'Телефон заказчика:'.$_POST['phone']; 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";

    mail($to, $subject, $message, $headers);

    /**
     *  Send message to telegram
     */
    $access_token = '385381114:AAERSywbBwSVSEu_bFiHgnyq8rgJ6VPznZg';
    $api = 'https://api.telegram.org/bot' . $access_token;
    $chat_id = '-281173730';

    file_get_contents($GLOBALS['api'] . '/sendMessage?chat_id=' . $chat_id . '&text=' . urlencode($message));
}
?>