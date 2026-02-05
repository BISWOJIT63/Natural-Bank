import { Inter } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "Natural Bank",
    description: "Experience the gravity of premium banking.",
};



// ...

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.variable} suppressHydrationWarning={true}>
                <AuthProvider>

                    <Navbar />
                    <SmoothScrolling>
                        {children}
                        <Footer />
                    </SmoothScrolling>
                </AuthProvider>
            </body>
        </html>
    );
}
