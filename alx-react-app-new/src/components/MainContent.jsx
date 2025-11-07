function MainContent() {
  return (
    <main
      style={{
        padding: '20px',
        backgroundColor: '#eef2ff',
        minHeight: '200px'
      }}
    >
      <p style={{ fontSize: '18px' }}>
        Here are some cities I would love to visit someday:
      </p>

      <ul style={{ marginLeft: '20px' }}>
        <li>Lagos</li>
        <li>Nairobi</li>
        <li>Tokyo</li>
        <li>London</li>
      </ul>
    </main>
  );
}

export default MainContent;
