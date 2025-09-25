<?php
header('Content-Type: application/json');

$response = array('success' => false, 'message' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST['phone']);
    $service = strip_tags(trim($_POST['service']));
    $message = strip_tags(trim($_POST['message']));

    // Check for required fields and validate email
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = 'Please fill out all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address.';
    } else {
        // Set the recipient email address. CHANGE THIS TO YOUR EMAIL.
        $recipient = "rusagusa.jeix@gmail.com"; 
        
        // Set the email subject
        $subject = "New Appointment Request from uburizasolution.com";
        
        // Build the email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Phone: $phone\n";
        $email_content .= "Service: $service\n\n";
        $email_content .= "Message:\n$message\n";
        
        // Build the email headers
        $email_headers = "From: " . $name . " <" . $email . ">";

        // Send the email
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            $response['success'] = true;
            $response['message'] = 'Thank you! Your appointment has been booked.';
        } else {
            $response['message'] = 'An unexpected error occurred. Please try again later.';
        }
    }
} else {
    $response['message'] = 'Invalid request.';
}

echo json_encode($response);
?>