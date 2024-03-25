import React from "react";
import { ITip } from "../interfaces/tip";
import Card from "./Tip";
import { react } from "@babel/types";

type Tips = null | Array<ITip>;

function TipsList() {
  const [tips, setTips] = React.useState<Tips>(null);
  const [search, setSearch] = React.useState('')
  console.log(search)

  React.useEffect(() => {
    async function fetchTips() {
      const resp = await fetch("/api/tips");
      const data = await resp.json();
      setTips(data);
    }
    fetchTips();
  }, []);

  console.log("Here are all the tips we have fetched:");
  console.log(tips);


  function handleChange(e: any) {
    setSearch(e.currentTarget.value)
  }

  function filterResults() {
    return tips?.filter(searchResult => {
      return searchResult.name.toLowerCase().includes(search.toLowerCase())
    })
  }

  if (!tips) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }

  // TODO: Add Tailwind/CSS to this
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-center mt-8">
          <input id="searchBar"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-96"
            placeholder="Search for Advice"
            onChange={handleChange}
            value={search}
          />
        </div>
      </div>
      <div>
        <div className="flex">
          {filterResults()?.map((tip) => {
            return <Card key={tip._id} {...tip} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default TipsList;
