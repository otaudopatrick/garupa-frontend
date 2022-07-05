import React, { useCallback, useEffect, useState } from "react";
import { PunkService } from "../../services/punk-service";

import "./home-styles.css"
import { Beer } from "./home-types";

const Home = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [total, setTotal] = useState(325);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  const limits = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    async function loadBeers() {
      const { data } = await PunkService.handle({ page: currentPage, limit })
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setBeers(data);
    }
    loadBeers()

  }, [currentPage, limit, total])
  return (
    <div className="page">
      <div className="container home-container">
        <div className="wrapper-container home-wrapper-container">
          <h1 className="page-title">Bem vindo!</h1>
          <select onChange={limits}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
          </select>


          <div className="table-head">
            <div className="table-head-item">#</div>
            <div className="table-head-item">Imagem</div>
            <div className="table-head-item">name</div>
          </div>
          <div className="table-container">


            {beers.map((beer) => (
              <div className="row" key={beer.id}>
                <div className="colunm">{beer.id}</div>
                <div className="colunm"><img src={beer.image_url} alt={beer.name} loading="lazy" /></div>
                <div className="colunm">{beer.name}</div>
              </div>

            ))}

          </div>

          <div className="pagination-container">
            {currentPage > 1 && (
              <div className="pagination-button">
                <div className="pagination-item" onClick={() => setCurrentPage(currentPage - 1)}> Anterior</div>
              </div>

            )}
            <div className="pagination">



              {pages.map((page) => (
                <div className={`pagination-item ${page === currentPage ? "isSelect" : ""}`} key={page}
                  onClick={() => setCurrentPage(page)}> {page}</div>
              ))}

            </div>
            {currentPage < pages.length && (
              <div className="pagination-button">
                <div className="pagination-item" onClick={() => setCurrentPage(currentPage + 1)}>Próximo</div>
              </div>

            )}
          </div>


        </div>
      </div>
    </div>
  )
}


export default Home