<!-- Handle form submission in process.php -->
 <?php
// Set timezone to Indian Standard Time (IST)
date_default_timezone_set('Asia/Kolkata');

// Initialize variables for form data and errors
$name = $email = "";
$errors = [];

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');

    // Server-side validation
    // Validate name (not empty, only letters and spaces allowed)
    if (empty($name)) {
        $errors[] = "Name is required.";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
        $errors[] = "Name can only contain letters and spaces.";
    } elseif (strlen($name) > 50) {
        $errors[] = "Name is too long (max 50 characters).";
    }

    // Validate email
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // If no errors, process the data
    if (empty($errors)) {
        // Sanitize output to prevent XSS
        $name = htmlspecialchars($name);
        $email = htmlspecialchars($email);

        // Display success message with current time in IST
        $currentTime = date("H:i:s");
        echo "Form submitted successfully!<br>";
        echo "Name: $name<br>";
        echo "Email: $email<br>";
        echo "Submission time (IST): $currentTime";
    } else {
        // Display errors
        echo "Please fix the following errors:<br>";
        foreach ($errors as $error) {
            echo "- $error<br>";
        }
    }
} else {
    echo "Invalid request method.";
}
?>