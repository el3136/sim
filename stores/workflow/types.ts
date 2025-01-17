import { Node, Edge } from 'reactflow'
import { OutputType, SubBlockType } from '@/blocks/types/block'

export interface Position {
  x: number
  y: number
}

export interface BlockState {
  id: string
  type: string
  name: string
  position: Position
  subBlocks: Record<string, SubBlockState>
  outputType: OutputType
}

export interface SubBlockState {
  id: string
  type: SubBlockType
  value: string | number | string[][] | null
}

export interface WorkflowState {
  blocks: Record<string, BlockState>
  edges: Edge[]
  selectedBlockId: string | null
}

export interface WorkflowActions {
  addBlock: (
    id: string,
    type: string,
    name: string,
    position: Position
  ) => void
  updateBlockPosition: (id: string, position: Position) => void
  updateSubBlock: (blockId: string, subBlockId: string, subBlock: SubBlockState) => void
  removeBlock: (id: string) => void
  addEdge: (edge: Edge) => void
  removeEdge: (edgeId: string) => void
  setSelectedBlock: (id: string | null) => void
  clear: () => void
}

export type WorkflowStore = WorkflowState & WorkflowActions 