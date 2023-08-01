import Link from "next/link";
import Heading from "@/components/Heading";
import PaginationBar from "@/components/PaginationBar";
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';

export const metadata = {
    title: "Reviews",};

//export const revalidate = 30; // seconds
const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
    const page = parsePageParam(searchParams.page);
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
    console.log('[Reviewspage] rendering:', page);
    return (
        <div>
            <Heading>Reviews</Heading>
            <PaginationBar page={page} pageCount={pageCount} href="reviews"/>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug} className="bg-white border w-80 rounded shadow hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}> <Image src={review.image} alt="" priority={index === 0} width="320" height="180" className="rounded-t" />
                        <h2 className="font-semibold font-orbitron py-1 text-center">{review.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0 ) {
            return page;
        }
    }
    return 1;
}
