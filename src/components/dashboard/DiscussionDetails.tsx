import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  MessageCircle,
  Eye,
  Heart,
  MapPin,
  ArrowLeft,
  Send
} from 'lucide-react';

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  timestamp: string;
  likes: number;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  topic: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    distance?: string;
    expertise?: string[];
  };
  stats: {
    replies: number;
    likes: number;
    views: number;
  };
  lastActivity: string;
  tags: string[];
  replies: Reply[];
}

// Mock data - in a real app, this would come from an API
const discussionData: Discussion = {
  id: '1',
  title: 'Transition vers l\'agriculture régénératrice',
  content: `Je souhaite partager mon expérience de transition vers l'agriculture régénératrice et j'aimerais avoir vos retours d'expérience.

Après 15 ans d'agriculture conventionnelle, j'ai décidé de faire évoluer mes pratiques vers une approche plus régénératrice. Voici les principales étapes que j'ai suivies :

1. Réduction du travail du sol
2. Introduction de couverts végétaux
3. Diversification des rotations
4. Intégration de l'agroforesterie

Les premiers résultats sont encourageants avec une amélioration visible de la structure du sol et une réduction des intrants. Cependant, je rencontre quelques défis, notamment :

- La gestion des adventices
- L'adaptation du matériel
- La commercialisation des nouvelles productions

Quelles sont vos expériences ? Avez-vous des conseils à partager ?`,
  topic: 'Pratiques Agricoles',
  author: {
    name: 'Marie Dubois',
    avatar: '/avatars/marie.jpg',
    location: 'Toulouse',
    distance: '15 km',
    expertise: ['Agriculture Bio', 'Maraîchage']
  },
  stats: {
    replies: 23,
    likes: 45,
    views: 230
  },
  lastActivity: '2h',
  tags: ['Agriculture Régénératrice', 'Transition', 'Sols'],
  replies: [
    {
      id: '1',
      content: 'Excellent retour d\'expérience ! Pour la gestion des adventices, avez-vous essayé les cultures associées ?',
      author: {
        name: 'Pierre Martin',
        avatar: '/avatars/pierre.jpg',
        location: 'Lyon'
      },
      timestamp: 'Il y a 1h',
      likes: 5
    },
    {
      id: '2',
      content: 'Je suis également en transition. Pour le matériel, j\'ai trouvé des solutions intéressantes en CUMA. Je peux vous partager les contacts si vous voulez.',
      author: {
        name: 'Sophie Bernard',
        avatar: '/avatars/sophie.jpg',
        location: 'Albi'
      },
      timestamp: 'Il y a 30min',
      likes: 3
    }
  ]
};

export function DiscussionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newReply, setNewReply] = React.useState('');

  // In a real app, you would fetch the discussion data based on the id
  const discussion = discussionData;

  return (
    <div className="p-8 space-y-6">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/community')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux discussions
      </Button>

      {/* Discussion Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={discussion.author.avatar} />
                <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{discussion.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{discussion.author.name}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {discussion.author.distance}
                  </div>
                  <span>•</span>
                  <span>il y a {discussion.lastActivity}</span>
                </div>
              </div>
              <Badge variant="secondary">{discussion.topic}</Badge>
            </div>

            <div className="prose max-w-none">
              {discussion.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {discussion.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 ml-auto text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {discussion.stats.replies}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {discussion.stats.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {discussion.stats.likes}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies Section */}
      <Card>
        <CardHeader>
          <CardTitle>Réponses ({discussion.replies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="flex gap-4 pb-6 border-b last:pb-0 last:border-0">
                <Avatar>
                  <AvatarImage src={reply.author.avatar} />
                  <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{reply.author.name}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      {reply.likes}
                    </Button>
                  </div>
                  <p>{reply.content}</p>
                </div>
              </div>
            ))}

            {/* Reply Input */}
            <div className="flex gap-4 pt-4">
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Ajouter une réponse..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Répondre
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
