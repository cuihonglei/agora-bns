import { Inter } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "./_utils/auth-context";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://cdn.botpress.cloud/webchat/v1/inject.js" />
      <body className={inter.className}>

        {/* Auth Context */}
        <AuthContextProvider>
          {children}
        </AuthContextProvider>

        {/* Chatbot */}
        <div className="fixed bottom-4 left-4">
          <div className="chat-widget">
            <Script src="https://mediafiles.botpress.cloud/eacbf454-69c0-4f33-8a92-f53059a128af/webchat/config.js" />
          </div>
        </div>
      </body>
    </html>
  );
}
