export const htmlForMail = (url:string) => {
    return(`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f3ff;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 480px;
      margin: auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(128, 90, 213, 0.1);
      text-align: center;
    }
    h1 {
      color: #6b46c1;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin: 16px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      margin-top: 20px;
      background-color: #805ad5;
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #aaa;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset 🔐</h1>
    <p>Forgot it? No biggie. Even smart brains need a reboot!</p>
    <p>Click the button below to reset your password:</p>
    <a href=${url} class="btn">Reset Password</a>
    <p>If you didn't request this, feel free to ignore it.</p>
    <div class="footer">
      © 2025 YourAppName. All rights reserved.
    </div>
  </div>
</body>
</html>

        `)
}