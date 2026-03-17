import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Tabs */}
      <section className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible custom-scrollbar pb-2 lg:pb-0">
        <button
          className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${activeTab === 1
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-card/50 text-gray-400 hover:bg-card hover:text-white border border-white/5"
            }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </button>
        <button
          className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${activeTab === 2
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-card/50 text-gray-400 hover:bg-card hover:text-white border border-white/5"
            }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </button>
        <button
          className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${activeTab === 3
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-card/50 text-gray-400 hover:bg-card hover:text-white border border-white/5"
            }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </button>
      </section>

      {/* Tab Content */}
      <section className="w-full lg:w-3/4">
        {/* Write Review Tab */}
        {activeTab === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Share Your Experience</h3>
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-6 max-w-2xl">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                    Rating
                  </label>
                  <div className="relative">
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full appearance-none bg-card/60 border border-white/10 text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer"
                    >
                      <option value="" className="bg-card">Select Rating</option>
                      <option value="1" className="bg-card">1 - Inferior</option>
                      <option value="2" className="bg-card">2 - Decent</option>
                      <option value="3" className="bg-card">3 - Great</option>
                      <option value="4" className="bg-card">4 - Excellent</option>
                      <option value="5" className="bg-card">5 - Exceptional</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-card/60 border border-white/10 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 resize-none transition-all"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="btn-primary py-3 px-8 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg"
                >
                  {loadingProductReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="glass-effect rounded-2xl p-8 text-center border border-white/5">
                <p className="text-gray-300 mb-4 text-lg">
                  Please sign in to write a review
                </p>
                <Link to="/login" className="btn-secondary inline-block">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Customer Reviews</h3>

            {product.reviews.length === 0 ? (
              <div className="bg-card/30 rounded-2xl p-8 text-center border border-white/5">
                <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-md">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong className="text-white block">{review.name}</strong>
                          <p className="text-xs text-gray-400">
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="bg-card/80 px-2 py-1 rounded-lg border border-white/5">
                        <Ratings value={review.rating} />
                      </div>
                    </div>
                    <p className="text-gray-300 mt-4 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {!data ? (
                <div className="col-span-full flex justify-center py-12"><Loader /></div>
              ) : (
                data.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;