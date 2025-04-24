import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import cn from 'classnames'
import NodePanel from './node'
import type { WorkflowProcess } from '@/types/app'
import CheckCircle from '@/app/components/base/icons/solid/general/check-circle'
import AlertCircle from '@/app/components/base/icons/solid/alert-circle'
import Loading02 from '@/app/components/base/icons/line/loading-02'
import ChevronRight from '@/app/components/base/icons/line/chevron-right'
import { WorkflowRunningStatus } from '@/types/app'

type WorkflowProcessProps = {
  data: WorkflowProcess
  grayBg?: boolean
  expand?: boolean
  hideInfo?: boolean
}
const WorkflowProcessItem = ({ data, hideInfo = false }: WorkflowProcessProps) => {
  const running = data.status === WorkflowRunningStatus.Running
  const succeeded = data.status === WorkflowRunningStatus.Succeeded
  const failed = data.status === WorkflowRunningStatus.Failed || data.status === WorkflowRunningStatus.Stopped

  // 仅展示最新一步，不折叠
  const lastNode = data.tracing && data.tracing.length > 0 ? data.tracing[data.tracing.length - 1] : null

  // 背景色仅基于状态
  let background: string | undefined
  if (running) background = 'linear-gradient(180deg, #E1E4EA 0%, #EAECF0 100%)'
  else if (succeeded) background = 'linear-gradient(180deg, #ECFDF3 0%, #F6FEF9 100%)'
  else if (failed) background = 'linear-gradient(180deg, #FEE4E2 0%, #FEF3F2 100%)'

  return (
    <div
      className={cn(
        'mb-2 rounded-xl border-[0.5px] border-black/[0.08] py-2',
        hideInfo ? 'mx-[-8px] px-1' : 'w-full px-3',
      )}
      style={{
        background,
      }}
    >
      <div className={cn('flex items-center h-[18px]', hideInfo && 'px-[6px]')}>
        {running && (
          <Loading02 className='shrink-0 mr-1 w-3 h-3 text-[#667085] animate-spin' />
        )}
        {succeeded && (
          <CheckCircle className='shrink-0 mr-1 w-3 h-3 text-[#12B76A]' />
        )}
        {failed && (
          <AlertCircle className='shrink-0 mr-1 w-3 h-3 text-[#F04438]' />
        )}
        <div className='grow text-xs font-medium text-gray-700 leading-[18px]'>
          {lastNode?.title || 'Workflow Process'}
        </div>
      </div>
    </div>
  )
}

export default WorkflowProcessItem
