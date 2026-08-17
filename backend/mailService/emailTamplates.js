export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the link below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset link is only valid for 24 hours only.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

export const EMAILISVERIFIED = `
  <td align="center" class="esd-stripe">
  <table bgcolor="#efefef" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
    <tbody>
      <tr>
        <td align="left" class="esd-structure es-p30t es-p40b es-p40r es-p40l">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td width="520" align="center" valign="top" class="esd-container-frame">
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" class="esd-empty-container" style="display: none"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" class="esd-structure es-p40r es-p40l">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td width="520" align="center" valign="top" class="esd-container-frame">
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td align="left" class="esd-block-text">
                          <p>
                            Thanks,
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="esd-block-spacer es-p40t es-p20b" style="font-size: 0">
                          <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td style="border-bottom: 1px solid #666666; background: unset; height: 0px; width: 100%; margin: 0px"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>
`


export const EMAILVERIFIED = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f3f6f5;
  font-family: Arial, Helvetica, sans-serif;
  color: #111111;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background-color:#f3f6f5;"
>
  <tr>
    <td
      align="center"
      style="padding:60px 20px;"
    >

      <!-- CARD -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width:620px;
          background:#ffffff;
          border:1px solid #e6e9e8;
          border-radius:16px;
          overflow:hidden;
        "
      >

        <!-- DIVIDER -->
        <tr>
          <td style="
            padding:0 42px;
          ">
            <div style="
              height:1px;
              background:#eeeeee;
            "></div>
          </td>
        </tr>


        <!-- CONTENT -->
        <tr>
          <td style="
            padding:48px 42px 45px;
          ">

            <!-- SMALL LABEL -->
            <div style="
              font-size:12px;
              font-weight:700;
              letter-spacing:1.2px;
              text-transform:uppercase;
              color:#18a765;
              margin-bottom:18px;
            ">
              Verification complete
            </div>


            <!-- TITLE -->
            <h1 style="
              margin:0;
              font-size:36px;
              line-height:1.15;
              letter-spacing:-1.2px;
              font-weight:700;
              color:#111111;
            ">
              You're all<br>
              <span style="color:#18a765;">
                verified.
              </span>
            </h1>


            <!-- DESCRIPTION -->
            <p style="
              margin:24px 0 0;
              max-width:480px;
              font-size:16px;
              line-height:1.7;
              color:#5f6864;
            ">
              Your email address has been successfully verified.
              Your account is now active and ready to use.
            </p>


            <!-- VERIFIED EMAIL -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin-top:32px;
                background:#fafcfb;
                border:1px solid #e4e9e6;
                border-radius:10px;
              "
            >
              <tr>
                <td style="padding:18px 20px;">

                  <div style="
                    font-size:11px;
                    text-transform:uppercase;
                    letter-spacing:1px;
                    font-weight:700;
                    color:#929b97;
                    margin-bottom:7px;
                  ">
                    Verified email
                  </div>

                  <div style="
                    font-size:15px;
                    font-weight:600;
                    color:#111111;
                    word-break:break-word;
                  ">
                    {{email}}
                  </div>

                </td>

                <td
                  align="right"
                  valign="middle"
                  style="padding:18px 20px;"
                >
                  <div style="
                    display:inline-block;
                    padding:6px 10px;
                    border-radius:20px;
                    background:#e9f9f0;
                    color:#15995c;
                    font-size:11px;
                    font-weight:700;
                  ">
                    VERIFIED
                  </div>
                </td>

              </tr>
            </table>


            <!-- CTA -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-top:32px;"
            >
              <tr>
                <td>

                  <a
                    href="${process.env.CLIENT_URL}/login"
                    style="
                      display:inline-block;
                      padding:14px 22px;
                      background:#111111;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:8px;
                      font-size:14px;
                      font-weight:600;
                    "
                  >
                    Continue to your account
                    &nbsp;→
                  </a>

                </td>
              </tr>
            </table>


          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`