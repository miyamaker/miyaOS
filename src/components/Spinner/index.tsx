import LoadingHourglass from '@/assets/loading_hourglass.gif'

export const Spinner = ({ width }: { width?: string }) => {
  return (
    <div>
      <img src={LoadingHourglass} alt="Loading..." style={{ width: width || '16px', border: 'none' }} />
    </div>
  )
}
