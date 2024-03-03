export default function resetPasswordTemplate(redirectLink: string) {
  return `
  <html>
  <body style="margin: 0px">
    <div
      style="
        width: 100%;
        -webkit-text-size-adjust: none;
        -webkit-font-smoothing: antialiased;
        background-color: #dbeafe;
        margin-top: 0px;
        padding-bottom: 50px;
        padding-top: 50px;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        line-height: 20px;
      "
    >
      <div
        style="max-width: 560px; background-color: white; margin-left: auto; margin-right: auto; border-radius: 20px"
      >
        <!--template header-->
        <div
          align="center"
          valign="center"
          style="border-bottom: 1px solid #cbd5e1; height: 50px; padding-top: 30px; padding-bottom: 30px"
        >
          <h1>Finaki</h1>
        </div>
        <!--template body-->
        <div style="padding-top: 10px; padding-bottom: 5px; padding-left: 50px; padding-right: 50px; font-size: 18px">
          <p>Apakah anda ingin me-reset password?</p>
        </div>

        <div style="padding-top: 10px; padding-bottom: 5px; padding-left: 50px; padding-right: 50px">
          <p>
            Kamu menerima email ini karena lupa password. Untuk mereset password anda silahkan klik tombol di bawah ini:
          </p>
        </div>

        <div style="text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 50px; padding-right: 50px">
          <a
            href=${redirectLink}
            target="_blank"
            rel="noopener"
            style="
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              text-align: center;
              padding: 0.75575rem 1.3rem;
              font-size: 0.925rem;
              line-height: 1.5;
              border-radius: 0.35rem;
              color: #ffffff;
              background-color: #3b82f6;
              border: 0px;
              margin-right: 0.75rem !important;
              font-weight: 600 !important;
              outline: none !important;
              vertical-align: middle;
            "
            target="_blank"
            >Ganti Password</a
          >
        </div>

        <div
          style="
            border-bottom: 1px solid #cbd5e1;
            padding-top: 5px;
            padding-bottom: 36px;
            padding-left: 50px;
            padding-right: 50px;
          "
        >
          <p>Link akan kadaluarsa dalam 30 menit</p>
          <p>Jika anda tidak melakukan permintaan ini, abaikan email ini</p>
          <p>Tombol tidak dapat diklik?, paste url ini di browser:</p>
          <a
            href=${redirectLink}
            rel="noopener"
            target="_blank"
            style="text-decoration: none; color: #000000; cursor: pointer; color: #3b82f6;"
            >${redirectLink}</a
          >
          <p>Terima kasih</p>
        </div>

        <!-- footer -->
        <div style="text-align: center; font-weight: 600; padding-bottom: 30px; line-height: 12px">
          <p style="color: gray">Jika ada pertanyaan silahkan hubungi</p>
          <br />
          <a
            style="
              text-decoration: none;
              border-style: none;
              border: 0;
              color: #3b82f6;
              font-weight: 600;
              border-radius: 20px;
              padding: 10px 20px;
              border: 1px solid #3b82f6;
            "
            href="mailto:SUPPORT_EMAIL"
            >Support</a
          >
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}
