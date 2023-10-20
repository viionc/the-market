function PopularListingsBanner() {
    return (
        <section className="container w-full bg-mainGreen h-[30rem] mt-10 rounded-lg cursor-pointer shadow-md text-4xl font-semibold text-zinc-600 flex justify-center gap-12">
            <p className="max-w-[40%] mt-24">
                {" "}
                Check the most popular listings on The <span className="font-bold text-white">Market</span>
            </p>
            <img className="rounded-md my-12 hidden md:block" src="/assets/bazaar-popular.jpeg" alt=""></img>
        </section>
    );
}

export default PopularListingsBanner;
