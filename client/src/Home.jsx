import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectPrice,setSelectPrice]=useState("")
  const [count, setCount] = useState(0);
  const [value,setValue]=useState(0)
  const [cartState,setCartState]=useState([])
  const navigate=useNavigate()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const jsonData = await res.json().then();
        setData(jsonData.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addToCart=(product)=>{
    setCount(count+1)
    setValue((value)=>value+product.price)
    cartState.push(product.id)
  }

  const removeFromCart=(product)=>{
    setCount(count-1)
    setValue((value)=>value-product.price)
    setCartState((prevState)=>prevState.filter((productId)=>productId !== product.id))
  }

  const handleLogout=(e)=>{
    e.preventDefault()
    navigate('/')
  }


  return (
    <div className="flex flex-col gap-4"> 
      <div className="flex justify-end gap-4">
      <p className="flex justify-end">Cart:<span className="pl-1">{count}</span></p>
      <p>Value: Rs.{value}</p>
      <button className="border border-solid border-black w-16" onClick={handleLogout}>Logout</button>
      </div>
      <div className=" h-[35px] w-100%  flex gap-14">
        <div className="border border-solid border-black w-1/2 h-full">
          <input
            type="text"
            className=" rounded-lg w-full h-full px-2 outline-none"
            placeholder="Search product"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="border border-solid border-black h-full w-1/2">
          <select 
          value={selectPrice}
          name="Price"
          onChange={(e)=>setSelectPrice(e.target.value)}
          className="h-full w-full outline-none">
            <option value="">Price</option>
            <option value="lt100">Less than 100</option>
            <option value="lt500">Less than 500</option>
            <option value="gt500">More than 500</option>
            </select>
        </div>
      </div>
      <div className=" h-100% w-100% flex flex-wrap  justify-start gap-14 ">
        {
          data.length > 0 && data.filter((product)=>product.title.toLowerCase().includes(searchText.toLowerCase())).filter((product)=>{
            if (selectPrice === "lt100") {
              return product.price < 100;
            } else if (selectPrice === "lt500") {
              return product.price < 500;
            } else if (selectPrice === "gt500") {
              return product.price > 500;
            }
            // Add other conditions as needed
            return true; // Default case if no condition is matched
          }).map((products,index)=>{
            return (
              <div key={index} className="border border-solid border-black h-[300px] w-[262px]  flex flex-col gap-2"> 
            <div className="h-[210px] w-full">
              <img
                src={products.thumbnail}
                alt="img"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm">{products.title}</div>
              <div className="text-sm">Rs. {products.price}</div>
              {
                cartState.includes(products.id) ?(
                  <div className="border border-solid border-black cursor-pointer mt-2"
                  onClick={(e)=>removeFromCart(products)}
                  >
                  Remove from cart
                  </div>
                ):(
                  <div className="border border-solid border-black cursor-pointer mt-2"
                  onClick={()=>addToCart(products)}
                  >
                    
                   Add to cart
                  </div>
                )
              }
             
            </div>
          </div>
            )
          })
        }
        
      </div>
    </div>
  );
}

export default Home;
