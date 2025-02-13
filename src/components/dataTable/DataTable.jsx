import React from "react";

export default function DataTable() {
  return (
    <table>
      <thead>
        <tr>
          {header?.map((td, index) => (
            <td key={index}>{td}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((custumer) => (
          <tr key={custumer._id}>
            <td>{custumer.fullname}</td>
            <td>{custumer.phone}</td>
            <td>{custumer.address}</td>
            <td>{custumer.limit === -1 ? "Безлимитный" : custumer.limit}</td>
            <td className={styles.action}>
              <Link
                href={{
                  pathname: "/custumers/edit-custumer",
                  query: { custumerId: custumer._id },
                }}
              >
                <Edit />
              </Link>

              <button
                onClick={() =>
                  handleDelete(
                    "/custumers",
                    custumer._id,
                    custumers,
                    setCustumers
                  )
                }
              >
                <Delete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
