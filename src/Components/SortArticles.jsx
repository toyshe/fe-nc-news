export default function SortArticles({ setSortBy, setOrder }) {
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };
  return (
    <>
      <p>Sort By</p>
      <select onChange={handleSortChange}>
        <option value="created_at">date</option>
        <option value="comment_count">comment count</option>
        <option value="votes">votes</option>
      </select>

      <p>Order</p>
      <select onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </>
  );
}
