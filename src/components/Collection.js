import styled,{css} from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Thumbnail = styled.div`
    width:252px;
    height:252px;
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
    ${({image})=>css`
          background-image: url(${image});
        `
    }
    text-align:center;
    display:flex;
    justify-content: center;
    flex-direction: column;
    margin: 5px;

    &:nth-first{
        margin-left:0;
    }
`;

const Collection = ({images})=>{
    return (
        <Wrapper>
            {images.map((each,idx)=>
                (<Thumbnail image={each.image} key={`thumb_${idx}`}>
                    <p>{each.description}</p>
                    <p>{each.type}</p>
                </Thumbnail>)
            )}
        </Wrapper>
    )
}

export default Collection;