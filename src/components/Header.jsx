function Header({clickCount}) {
  return <div className="header">
    <div className="title">Battleship</div>
    <div className="counter">{clickCount}</div>
  </div>

}

export default Header;