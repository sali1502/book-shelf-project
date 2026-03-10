/* Book review accordion component for details page */

type Review = {
	id: string;
	user: {
		name: string;
		avatarUrl?: string;
	};
	content: string;
	createdAt: string;
};

type BookReviewsAccordionProps = {
	reviews?: Review[];
};

export default function BookReviewsAccordion({
	reviews = [],
}: BookReviewsAccordionProps) {
	return (
		<section className="max-w-6xl w-full mx-auto mt-6">
			<details
				className="bg-white rounded-xl border border-gray-200 shadow"
				open
			>
				<summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900 flex items-center justify-between">
					<span>Reviews ({reviews.length})</span>
					<span className="text-sm text-gray-500">Click to open/close</span>
				</summary>

				<div className="px-5 pb-5 border-t border-gray-100">
					{reviews.length === 0 ? (
						<p className="text-sm text-gray-500 pt-4">
							No reviews yet for this book.
						</p>
					) : (
						<ul className="pt-4 space-y-4">
							{reviews.map((review) => {
								const avatar =
									review.user.avatarUrl ||
									`https://ui-avatars.com/api/?name=${encodeURIComponent(review.user.name)}&background=0f766e&color=fff`;

								return (
									<li
										key={review.id}
										className="rounded-lg border border-gray-200 p-4"
									>
										<div className="flex items-start gap-3">
											<img
												src={avatar}
												alt={`${review.user.name} avatar`}
												className="w-10 h-10 rounded-full object-cover"
												loading="lazy"
											/>

											<div className="min-w-0 w-full">
												<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
													<p className="font-semibold text-gray-900">
														{review.user.name}
													</p>
													<p className="text-xs text-gray-500">
														{review.createdAt}
													</p>
												</div>

												<p className="text-sm text-gray-700 mt-2">
													{review.content}
												</p>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</details>
		</section>
	);
}
