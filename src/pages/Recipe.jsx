import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Recipe() {

  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  const param = useParams();

  const getRecipe = async(id) => {
    const api = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await api.json();
    setRecipe(data);
  };

  useEffect(() => {
    getRecipe(param.id);
  }, [param.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}>
            Instructions</Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}>
            Ingredients</Button>
        <div>
          {activeTab === 'instructions' && (
            <div>
              <h4 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h4>
              <h4 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h4>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul>
              {recipe.extendedIngredients.map((item) => {
                return <li key={item.id}>{item.original}</li>
              })}
            </ul>
          )}
        </div>
      </Info>
    </DetailWrapper>
  )
}

export default Recipe;

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1rem;
    line-height: 2rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 0.5rem;
  font-weight: 600;
  height: 4rem;

  &.active {
    background-color: #313131;
    color: white;
  }
`;

const Info = styled.div`
  margin: 2rem;
  /* display: flex;
  flex-direction: row; */
`;