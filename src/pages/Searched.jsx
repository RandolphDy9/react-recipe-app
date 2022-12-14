import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


function Searched() {

  const [searched, setSearched] = useState([]);
  const params = useParams();

  const getSearch = async(name) => {
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const data = await api.json();
    setSearched(data.results);
  };

  useEffect(() => {
    getSearch(params.search);
  }, [params.search]);

  
  return (
    <Grid>
      {searched.map((item) => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        )
      })}
    </Grid>
  )
}

export default Searched;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;