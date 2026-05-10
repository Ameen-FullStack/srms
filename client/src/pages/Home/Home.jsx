import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { getMaterials, getStats } from "../../api";

import { Spinner } from "../../components";

import { useAuth } from "../../context/AuthContext";

import StatsBar from "../../components/Home/StatsBar";
import SearchBar from "../../components/Home/SearchBar";
import MaterialsGrid from "../../components/Home/MaterialsGrid";
import EmptyState from "../../components/Home/EmptyState";
import Pagination from "../../components/Home/Pagination";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [materials, setMaterials] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    semester: "",
    fileType: "",
    sort: "newest",
  });

  const loadStats = async () => {
    try {
      const d = await getStats();

      setStats(d.stats);
    } catch {}
  };

  const loadMaterials = useCallback(
    async (p = 1) => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: p,
          limit: 12,
        });

        if (filters.search) {
          params.set("search", filters.search);
        }

        if (filters.subject) {
          params.set("subject", filters.subject);
        }

        if (filters.semester) {
          params.set("semester", filters.semester);
        }

        if (filters.fileType) {
          params.set("fileType", filters.fileType);
        }

        if (filters.sort) {
          params.set("sort", filters.sort);
        }

        const data = await getMaterials(params.toString());

        setMaterials(data.materials);
        setTotal(data.total);
        setPages(data.pages);
        setPage(p);
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadMaterials(1);
  }, [loadMaterials]);

  const handleSearch = (e) => {
    e.preventDefault();

    loadMaterials(1);
  };

  return (
    <div className="page">
      {stats && <StatsBar stats={stats} />}

      <SearchBar
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
          }}
        >
          {total} material
          {total !== 1 ? "s" : ""} found
        </p>

        {user && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/upload")}
          >
            + Upload
          </button>
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : (materials?.length || 0) === 0 ? (
        <EmptyState />
      ) : (
        <MaterialsGrid materials={materials || []} navigate={navigate} />
      )}

      {pages > 1 && (
        <Pagination page={page} pages={pages} loadMaterials={loadMaterials} />
      )}
    </div>
  );
}
