export default function Hero() {
    return (
        <section className="w-full bg-[url('/hero-img.jpg')] bg-cover bg-center py-16 flex items-center">
            <div className="bg-white/60 rounded-lg shadow-xl mx-auto p-8 text-teal-900 backdrop-blur-md text-center">
                <h1 className="text-4xl font-bold mb-4">Discover your next <br />favourite book</h1>
                <p className="text-base font-light mb-2">Search millions of books via Google Books.<br />Read reviews and share your thoughts!</p>
                <form className="mt-6 flex justify-center">
                    <label htmlFor="search-books" className="sr-only">Search books</label>
                    <input
                        id="search-books"
                        type="text"
                        placeholder="Search books..."
                        className="w-full max-w-md px-4 py-2 rounded border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 rounded bg-teal-700 text-white font-semibold hover:bg-teal-800 transition">Search</button>
                </form>
            </div>
        </section>
    );
}