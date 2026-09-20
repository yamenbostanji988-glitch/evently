function Categories() {
    const categories = [
        {
            id: 1,
            name: "Music",
            icon: "🎵"
        },
        {
            id: 2,
            name: "Technology",
            icon: "💻"
        },
        {
            id: 3,
            name: "Education",
            icon: "📚"
        },
        {
            id: 4,
            name: "Sports",
            icon: "⚽"
        },
        {
            id: 5,
            name: "Art",
            icon: "🎨"
        }
    ];

    return (
        <section className="categories-section">

            <div className="section-title">

                <h2>Browse Categories</h2>

                <p>
                    Explore events by category
                </p>

            </div>

            <div className="categories-container">

                {categories.map(function(category) {

                    return (
                        <div
                            className="category"
                            key={category.id}
                        >

                            <span>
                                {category.icon}
                            </span>

                            <h3>
                                {category.name}
                            </h3>

                        </div>
                    );

                })}

            </div>

        </section>
    );
}

export default Categories;