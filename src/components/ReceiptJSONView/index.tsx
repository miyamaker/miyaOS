import Filepack from '@/assets/filepack-0.png'

const truncateValue = (value: string): string => {
  if (value.length > 20) {
    return `${value.slice(0, 10)}...${value.slice(-10)}`
  }

  return value
}

const JSONNode = ({ keyName, data, depth }: { keyName?: string; data: any; depth: number }) => {
  if (keyName === 'verify') {
    return null
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <div className={`pl-${depth * 4}`}>
        {keyName && <span className="text-blue-600">{keyName}:</span>}
        {Object.keys(data).map((key) => (
          <JSONNode key={key} keyName={key} data={data[key]} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return (
    <div className={`pl-${depth * 4} py-1`}>
      <span className="text-blue-600">{keyName}:</span>
      {typeof data === 'string' && <span className="text-green-600 ml-2">&quot;{truncateValue(data)}&quot;</span>}
      {typeof data === 'number' && <span className="text-purple-600 ml-2">{data}</span>}
      {typeof data === 'boolean' && <span className="text-red-600 ml-2">{data.toString()}</span>}
    </div>
  )
}

const ReceiptJSONView = ({ data }: { data: any }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data)
  }

  return (
    <div className="border-l-2 border-blue-400 pl-2 relative">
      <div
        className="absolute top-0 right-0 m-2 cursor-pointer transform transition-transform duration-150 hover:scale-105 active:scale-95"
        onClick={handleCopy}
      >
        <img src={Filepack} alt="Copy" />
      </div>
      <JSONNode data={JSON.parse(data)} depth={1} />
    </div>
  )
}

export default ReceiptJSONView // ReceiptJSONView
