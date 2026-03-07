import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MenuClient from "@/components/products/MenuClient";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProducts() {
    try {
        await connectDB();
        const products = await Product.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("PRODUCT_FETCH_ERROR:", error);
        return [];
    }
}

export default async function MenuPage() {
    const products = await getProducts();

    return (
        <>
            <Navbar />
            <MenuClient products={products} />
            <Footer />
        </>
    );
}
