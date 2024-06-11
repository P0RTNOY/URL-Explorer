
 import './styles.css';

 function Links({url, links}){
    return <div className="links-wrapper">
        <h3>{url}</h3>
        <div className="list">{links.map(link => {
      return <label>{link}</label>
    })}</div>
    </div>
}

export default Links;