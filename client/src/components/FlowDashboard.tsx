import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Mail, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign,
  Calendar,
  ArrowUpRight
} from "lucide-react";

export default function FlowDashboard() {
  const invoices = [
    {
      id: "INV-001",
      client: "Acme Corp",
      amount: 5240,
      dueDate: "2 days overdue",
      status: "nudge-sent",
      nudgeCount: 2,
      lastNudge: "2 hours ago"
    },
    {
      id: "INV-002", 
      client: "TechStart Inc",
      amount: 1850,
      dueDate: "Due today",
      status: "pending",
      nudgeCount: 0,
      lastNudge: null
    },
    {
      id: "INV-003",
      client: "Design Studio",
      amount: 3200,
      dueDate: "Paid",
      status: "paid",
      nudgeCount: 1,
      lastNudge: "3 days ago"
    },
    {
      id: "INV-004",
      client: "Marketing Co",
      amount: 2750,
      dueDate: "5 days overdue",
      status: "escalated",
      nudgeCount: 3,
      lastNudge: "1 day ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "nudge-sent":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Nudge Sent</Badge>;
      case "escalated":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Escalated</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "escalated":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-slate-50 rounded-2xl border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Invoice Dashboard</h2>
          <p className="text-slate-600 mt-0.5">Automated nudging in action</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Flow Active</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 bg-white">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Outstanding</p>
                <p className="text-2xl font-bold text-slate-900">$8,790</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Payment</p>
                <p className="text-2xl font-bold text-slate-900">18 days</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Success Rate</p>
                <p className="text-2xl font-bold text-slate-900">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Auto Nudges</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <Mail className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card className="border-0 bg-white mb-8">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Active Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {invoices.map((invoice, index) => (
              <div 
                key={invoice.id} 
                className={`flex items-center justify-between p-4 ${
                  index !== invoices.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(invoice.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-900">{invoice.id}</span>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <p className="text-sm text-slate-600">{invoice.client}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${invoice.amount.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">{invoice.dueDate}</p>
                  </div>

                  {invoice.status !== "paid" && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">
                        {invoice.nudgeCount} nudge{invoice.nudgeCount !== 1 ? 's' : ''}
                      </p>
                      {invoice.lastNudge && (
                        <p className="text-sm text-slate-500">{invoice.lastNudge}</p>
                      )}
                    </div>
                  )}

                  <div className="w-20">
                    {invoice.status === "paid" ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">Paid</span>
                      </div>
                    ) : (
                      <Progress 
                        value={invoice.nudgeCount * 25} 
                        className="w-full h-2" 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Recent Nudge Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Gentle reminder sent to Acme Corp</p>
                <p className="text-sm text-slate-500">INV-001 • 2 hours ago</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Payment received from Design Studio</p>
                <p className="text-sm text-slate-500">INV-003 • 4 hours ago</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Escalated to personal follow-up</p>
                <p className="text-sm text-slate-500">Marketing Co • 1 day ago</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}