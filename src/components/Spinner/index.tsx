import LoadingHourglass from '@/assets/loading_hourglass.gif'

export const Spinner = () => {
  return (
    <div>
      <img src={LoadingHourglass} alt="Loading..." style={{ width: '16px', border: 'none' }} />
    </div>
  )
}
