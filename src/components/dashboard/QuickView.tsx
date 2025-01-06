import { Card } from "@/components/ui/card"
import { CalendarDays, CheckSquare } from "lucide-react"

// Mock data - replace with real data from your backend
const upcomingDeclarations = [
  {
    id: 1,
    title: "PAC Declaration",
    dueDate: "2025-01-15",
    status: "pending"
  },
  {
    id: 2,
    title: "Crop Rotation Report",
    dueDate: "2025-01-20",
    status: "pending"
  }
]

const tasks = [
  {
    id: 1,
    title: "Review irrigation schedule",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    title: "Update crop planning",
    priority: "medium",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Check soil analysis results",
    priority: "high",
    status: "pending"
  }
]

export function QuickView() {
  return (
    <div className="space-y-6">
      {/* Upcoming Declarations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Upcoming Declarations</h2>
        </div>
        <div className="space-y-3">
          {upcomingDeclarations.map((declaration) => (
            <Card key={declaration.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{declaration.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(declaration.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  {declaration.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Tasks</h2>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    Priority: {task.priority}
                  </span>
                </div>
                <span 
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'in-progress' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickView;
