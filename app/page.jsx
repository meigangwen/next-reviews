import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from '@/lib/reviews';

export const metadata = {
    title: "Indie Gamer",
};

export default async function HomePage() {
    // TODO load featured review
    const review = await getFeaturedReview();
    return (
        <div>
            <Heading>Indie Gamer</Heading>
            <p className="pb-3">
                Only the best indie games, reviewed for you.
            </p>
            
            
            <div className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
                <Link className="flex flex-col sm:flow-row" href={`/reviews/${review.slug}`}> 
                    <img src={review.image} alt="" width="320" height="180" className="rounded-t sm:rounded-l sm:rounded-r-none" />
                    <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">{review.title} </h2>
                </Link>
            </div>
            
        </div>
    );
}