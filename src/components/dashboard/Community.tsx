import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  MapPin,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Calendar,
  Tag,
  Plus,
  Search,
  Filter,
  MapPinned,
  User,
  Tractor,
  Leaf,
  Euro,
  Settings,
  Eye,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Discussion {
  id: string;
  title: string;
  preview: string;
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
}

interface NearbyFarmer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  distance: string;
  expertise: string[];
  crops: string[];
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'Transition vers l\'agriculture régénératrice',
    preview: 'Je souhaite partager mon expérience de transition vers l\'agriculture régénératrice. Quels sont les premiers pas à faire ?',
    content: 'Je souhaite partager mon expérience de transition vers l\'agriculture régénératrice. Quels sont les premiers pas à faire ?',
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
    tags: ['Agriculture Régénératrice', 'Transition', 'Sols']
  },
  {
    id: '2',
    title: 'Nouvelles mesures PAC 2024',
    preview: 'Discussion sur les nouvelles mesures de la PAC 2024 et leur impact sur nos exploitations.',
    content: 'Discussion sur les nouvelles mesures de la PAC 2024 et leur impact sur nos exploitations.',
    topic: 'Réglementation',
    author: {
      name: 'Pierre Martin',
      avatar: '/avatars/pierre.jpg',
      location: 'Lyon',
      distance: '25 km',
      expertise: ['Céréales', 'Agriculture Conventionnelle']
    },
    stats: {
      replies: 56,
      likes: 89,
      views: 567
    },
    lastActivity: '4h',
    tags: ['PAC 2024', 'Réglementation', 'Aides']
  }
];

const nearbyFarmers: NearbyFarmer[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    avatar: '/avatars/jean.jpg',
    location: 'Montauban',
    distance: '8 km',
    expertise: ['Viticulture Bio', 'Agroforesterie'],
    crops: ['Vigne', 'Fruits']
  },
  {
    id: '2',
    name: 'Sophie Bernard',
    avatar: '/avatars/sophie.jpg',
    location: 'Albi',
    distance: '12 km',
    expertise: ['Élevage Bio', 'Polyculture'],
    crops: ['Céréales', 'Bovins']
  }
];

const topics = [
  { id: 'all', name: 'Tous les sujets', icon: MessageSquare },
  { id: 'practices', name: 'Pratiques Agricoles', icon: Tractor },
  { id: 'sustainability', name: 'Durabilité', icon: Leaf },
  { id: 'regulation', name: 'Réglementation', icon: Settings },
  { id: 'market', name: 'Marché & Prix', icon: Euro }
];

export function Community() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiscussions, setFilteredDiscussions] = useState(discussions);

  // Filter discussions based on selected topic and search query
  useEffect(() => {
    let filtered = [...discussions];
    
    // Filter by topic
    if (selectedTopic !== 'all') {
      filtered = filtered.filter(d => {
        const topicMap: { [key: string]: string } = {
          'practices': 'Pratiques Agricoles',
          'sustainability': 'Durabilité',
          'regulation': 'Réglementation',
          'market': 'Marché & Prix'
        };
        return d.topic === topicMap[selectedTopic];
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query) ||
        d.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredDiscussions(filtered);
  }, [selectedTopic, searchQuery]);

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    // Update URL with topic parameter
    navigate({
      pathname: '/community',
      search: topicId === 'all' ? '' : `?topic=${topicId}`
    });
  };

  const handleDiscussionClick = (discussionId: string) => {
    navigate(`/community/discussion/${discussionId}`);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communauté</h1>
          <p className="text-muted-foreground">Échangez avec d'autres agriculteurs et trouvez des réponses à vos questions</p>
        </div>
        <Button onClick={() => navigate('/community/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Discussion
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Topics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sujets de Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTopicChange(topic.id)}
                >
                  <topic.icon className="mr-2 h-4 w-4" />
                  {topic.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Discussions */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une discussion..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          {/* Discussions List */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card 
                key={discussion.id} 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleDiscussionClick(discussion.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold hover:text-primary">{discussion.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                      <p className="mt-2 text-muted-foreground">{discussion.preview}</p>
                      <div className="mt-4 flex items-center gap-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Nearby Farmers */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="h-5 w-5" />
              Agriculteurs à proximité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyFarmers.map((farmer) => (
                <div key={farmer.id} className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b">
                  <Avatar>
                    <AvatarImage src={farmer.avatar} />
                    <AvatarFallback>{farmer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{farmer.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {farmer.distance}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {farmer.expertise.map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs">{exp}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}