function generateOTPEmail(otp) {
  return `
    <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 500px;
                margin: auto;
            }
            h1 {
                color: #333;
                font-size: 2rem;
                margin-bottom: 10px;
            }
            p {
                color: #666;
                font-size: 1rem;
                margin: 10px 0;
            }
            .otp {
                font-size: 1.5rem;
                font-weight: bold;
                color: #fff;
                margin: 20px 0;
                letter-spacing: 2px;
                padding: 10px;
                border-radius: 5px;
                background: linear-gradient(45deg, #ff6b6b, #f06595);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .warning {
                color: #d9534f;
                font-size: 0.875rem;
                margin-top: 20px;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.875rem;
                color: #999;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                font-size: 1rem;
                color: #fff;
                background-color: #007bff;
                border-radius: 5px;
                text-decoration: none;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .logo {
                margin-top: 20px;
                width: 100px;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Your OTP Code</h1>
            <p>Please use the following OTP code to complete your verification process:</p>
            <div class="otp">${otp}</div>
            <p>If you did not request this code, please ignore this email.</p>
            <div class="warning">Do not share this OTP with anyone. If you did not request this, please contact our support immediately.</div>
            <div class="footer">Thank you, <br/> GyanShristi</div>
            <img src='https://scontent.fktm14-1.fna.fbcdn.net/v/t39.30808-6/452627951_1055704396184044_1090243419969975738_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=HrWKOAyGv0oQ7kNvgFc9Iel&_nc_ht=scontent.fktm14-1.fna&oh=00_AYDPtNkSLA_u8QQZY74zBhTDAmXndPPQ-2vmI44QhYv3HA&oe=66A5CDD2' alt='GyanShristi Logo' class="logo">
        </div>
    </body>
    </html>
  `;
}

module.exports = generateOTPEmail;