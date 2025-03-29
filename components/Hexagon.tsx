'use client';
import Link from "next/link"

interface HexagonProps {
  id: string
  name: string
}

export default function Hexagon({ id, name }: HexagonProps) {
  return (
    <Link href={`/industry/${id}`} className="hexagon">
      <div className="hexagon-inner">{name}</div>
    </Link>
  )
}
