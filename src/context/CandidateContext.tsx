import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { Candidate } from "../types/Candidate";
import { calculatePriority } from "../utils/priorityEngine";

interface State {
  candidates: Candidate[];
}

type Action =
  | { type: "SET_CANDIDATES"; payload: Candidate[] }
  | {
      type: "UPDATE_SCORE";
      payload: {
        id: number;
        field: keyof Candidate;
        value: number;
      };
    };

const initialState: State = {
  candidates: [],
};

const CandidateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CANDIDATES":
        const enriched = action.payload.map((c, index) => {
            const { score, level } = calculatePriority(c);
            return {
            ...c,
            initialIndex: index,
            priorityScore: score,
            priorityLevel: level,
            };
        });

  return { ...state, candidates: enriched };

    case "UPDATE_SCORE":
      const updatedCandidates = state.candidates.map((c) => {
        if (c.id === action.payload.id) {
          const updatedCandidate = {
            ...c,
            [action.payload.field]: action.payload.value,
          };

          const { score, level } = calculatePriority(updatedCandidate);

          return {
            ...updatedCandidate,
            priorityScore: score,
            priorityLevel: level,
          };
        }
        return c;
      });

      return { ...state, candidates: updatedCandidates };

    default:
      return state;
  }
}

export const CandidateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CandidateContext.Provider value={{ state, dispatch }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) throw new Error("Context error");
  return context;
};