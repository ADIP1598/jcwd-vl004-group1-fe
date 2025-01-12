import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import Swal from 'sweetalert2'

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const results = await Axios.get(`${API_URL}/users`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSearch = async () => {
    await Axios.post(`${API_URL}/users/search`, { username: search })
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changestatus = (status,id) => {
    let bool = false;
    if(status==="activated"){
      bool = true;
    }
    Axios.patch(`${API_URL}/users/update/${id}`, { is_active: bool })
      .then((results) => {
        // setData(results.data);
        getUsers()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const showModal = (id, fullname, status) => {

    Swal.fire({
      title: `Are you sure you want to ${status} ${fullname}'s account?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status} account`,
      confirmButtonColor: '#008080',
      cancelButtonColor: '#808080',
    }).then((result)=> {
      if(result){
        changestatus(status,id)
      }
    })
    
  }

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>No. </th>
          <th>Fullname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Verified</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return data.map((val, i) => {
      return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{val.full_name}</td>
          <td>{val.username}</td>
          <td>{val.email}</td>
          <td>{val.phone}</td>
          <td>{val.is_verified ? (
            <div><i className="fas fa-check-square"></i></div>
          ):(
            <div className="fa fa-times"></div>
          )}</td>
          <td>{val.is_active ? (
            <button className="btn btn-success btn-sm btn-outline">Active</button>
          ):(
            <button className="btn btn-error btn-sm btn-outline">Inactive</button>
          )}</td>
          <td>
            {val.is_active ? (
              <>
               <div className="btn btn-error btn-sm btn-outline" onClick={()=>showModal(val.id,val.full_name,'deactivated')}><i class="fa fa fa-power-off" aria-hidden="true"></i></div>
              </>
            ):(
              <>
              <div className="btn btn-success btn-sm btn-outline" onClick={()=>showModal(val.id,val.full_name,'activated')}><i class="fa fa fa-check" aria-hidden="true"></i></div>
              
              </>              
            )}
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getIndex(12);
  }, [data]);

  const getIndex = (number) => {
    let total = Math.ceil(data.length/number)
    let page = []
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setPagination(page)
  }

  const selectpage = (id) => {
    let num = id
    let start = (num-1)*12
    let end = num*12
    setPageStart(start)
    setPageEnd(end)
  }

  return (
    <section className="content-main-full">
      {/* Search and Filter Section */}
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Manage Users</h2>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="input-group justify-content-end">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search User by username...."
                  className="input input-bordered w-60"
                  style={{backgroundColor:"white",borderColor:"teal"}}
                  value={search}
                />
                <button
                  onClick={onSearch}
                  className="btn btn-square btn-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </header>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          {TableHead()}
          <tbody>{TableBody()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li> */}
            {pagination.map((item)=> {
              return (
                <li className="page-item" key={item} onClick={()=>selectpage(item)}><button className="page-link">{item}</button></li>
              )
            })}
            {/* <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Users;
