import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { fetchAPI } from "../../utils";

export default function DiemDanh({ person }) {
  const [diemDanh, setDiemDanh] = useState(person.diemDanh);
  const [lyDo, setLyDo] = useState(person.lyDo);
  const { data: session } = useSession();
  const { cuochopId } = useRouter().query;
  const handleChangeDiemDanh = async () => {
    const newDiemDanh = !diemDanh;
    const newLyDo = newDiemDanh ? "" : lyDo;
    setDiemDanh(!diemDanh);
    setLyDo(newLyDo);
    await fetchAPI("/api/v1/cuochop/diemdanh", {
      method: "POST",
      body: {
        hoKhau: person.hoKhau,
        cuocHop: cuochopId,
        diemDanh: newDiemDanh,
        lyDo: newLyDo,
      },
      token: session.token,
    });
  };
  const handleSubmitReason = async () => {
    if (diemDanh) return;
    await fetchAPI("/api/v1/cuochop/diemdanh", {
      method: "POST",
      body: {
        hoKhau: person.hoKhau,
        cuocHop: cuochopId,
        diemDanh,
        lyDo,
      },
      token: session.token,
    });
  };

  return (
    <div className="grid grid-cols-4 gap-5 hover:bg-gray-50 py-3 rounded duration-50">
      <h1>{person.hoTenChuHo}</h1>
      <input
        type="checkbox"
        checked={diemDanh}
        onChange={handleChangeDiemDanh}
      />
      <input
        type="text"
        className="col-span-2 focus:outline-none border-b bg-transparent"
        value={lyDo}
        onChange={(e) => setLyDo(e.target.value)}
        onBlur={handleSubmitReason}
      />
    </div>
  );
}
