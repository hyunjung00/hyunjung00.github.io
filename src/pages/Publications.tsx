import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Building } from 'lucide-react';
import { DetailedPublication } from '@/types/content';
import { PublicationCard } from '@/components/publications/PublicationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Navigation } from '@/components/ui/Navigation';
import Fuse from 'fuse.js';

interface PublicationsPageProps {
  publications: DetailedPublication[];
}

export function PublicationsPage({ publications }: PublicationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(publications, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'authors', weight: 0.3 },
        { name: 'venue', weight: 0.2 },
        { name: 'keywords', weight: 0.1 }
      ],
      threshold: 0.3,
    });
  }, [publications]);

  // Get unique values for filters
  const years = useMemo(() => {
    const yearSet = new Set(publications.map(p => p.year));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [publications]);

  const venues = useMemo(() => {
    const venueSet = new Set(publications.map(p => p.venue_type).filter(Boolean));
    return Array.from(venueSet).sort();
  }, [publications]);

  const types = useMemo(() => {
    const typeSet = new Set(publications.map(p => p.type));
    return Array.from(typeSet).sort();
  }, [publications]);

  // Filter and search publications
  const filteredPublications = useMemo(() => {
    let result = publications;

    // Apply filters
    if (selectedYear !== 'all') {
      result = result.filter(p => p.year.toString() === selectedYear);
    }
    if (selectedVenue !== 'all') {
      result = result.filter(p => p.venue_type === selectedVenue);
    }
    if (selectedType !== 'all') {
      result = result.filter(p => p.type === selectedType);
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery.trim());
      const searchedItems = searchResults.map(result => result.item);
      result = result.filter(p => searchedItems.includes(p));
    }

    // Sort by year (newest first)
    return result.sort((a, b) => b.year - a.year);
  }, [publications, selectedYear, selectedVenue, selectedType, searchQuery, fuse]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('all');
    setSelectedVenue('all');
    setSelectedType('all');
  };

  const hasActiveFilters = searchQuery || selectedYear !== 'all' || selectedVenue !== 'all' || selectedType !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Navigation className="mb-8" />
        <Breadcrumbs items={[{ label: 'Publications' }]} />
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">Publications</h1>
          <p className="text-body text-lg">
            Research publications and academic contributions
          </p>
        </header>

        {/* Search and Filters */}
        <div className="bg-card border border-border-light rounded-lg p-6 mb-8 no-print">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-caption" />
              <Input
                type="text"
                placeholder="Search publications by title, authors, venue, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-heading mb-2 block">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-heading mb-2 block">Venue</label>
                <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger>
                    <Building className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All venues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All venues</SelectItem>
                    {venues.map(venue => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-heading mb-2 block">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-caption">
              Showing {filteredPublications.length} of {publications.length} publications
              {hasActiveFilters && ' (filtered)'}
            </p>
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="no-print"
            >
              Print/PDF
            </Button>
          </div>

          {/* Publications list */}
          {filteredPublications.length > 0 ? (
            <div className="space-y-6">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-caption text-lg mb-4">No publications found</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters to see all publications
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}