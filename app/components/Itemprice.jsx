const Itemprice = ({ item }) => {
  const [firstPrice, secondPrice] = item.split('.');

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'sans-serif' }}>
      <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        ${firstPrice}
      </span>
      {secondPrice && (
        <span className="text-gray-500 mt-3" style={{ fontSize: '1rem', marginLeft: '2px' }}>
          .{secondPrice}
        </span>
      )}
    </div>
  );
};

export default Itemprice;
