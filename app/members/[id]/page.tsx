import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchMemberById } from "@/lib/members-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilmIcon, LinkIcon, ArrowLeft } from "lucide-react";
import MemberShowreel from "@/components/members/member-showreel";
import MemberBio from "@/components/members/member-bio";
import MemberProjects from "@/components/members/member-projects";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch member data
  const member = await fetchMemberById(id);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Member Not Found</h1>
        <p className="text-gray-400 mb-8">
          The member you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/members">Back to Members</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-500 py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/members"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Members
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src={member.image || "/placeholder.svg?height=256&width=256"}
                  alt={member.name}
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Member Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                {member.name}
              </h1>
              <p className="text-xl text-white/90 mb-4">
                {member.specialty} Director
              </p>

              {member.tags && member.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {member.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {member.bio && (
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                  {member.bio.substring(0, 200)}...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Director's Showreel Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <FilmIcon size={24} className="mr-2 text-green-400" />
            Director's Showreel
          </h2>
          <MemberShowreel member={member} />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="bg-zinc-900 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-0">
                  <Suspense fallback={<LoadingSpinner />}>
                    <MemberBio member={member} />
                  </Suspense>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <Suspense fallback={<LoadingSpinner />}>
                    <MemberProjects memberId={id} />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Now aligned with tab content */}
            <div className="md:col-span-1">
              {/* Add spacing to align with tab content */}
              <div className="mb-6">
                <div className="h-10"></div>{" "}
                {/* This matches the TabsList height */}
              </div>

              <Card className="bg-zinc-900">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Contact Information
                  </h3>

                  {member.email && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-sm">Email</p>
                      <p>{member.email}</p>
                    </div>
                  )}

                  {member.phone && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p>{member.phone}</p>
                    </div>
                  )}

                  {member.location && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-sm">Location</p>
                      <p>{member.location}</p>
                    </div>
                  )}

                  {member.website && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-sm">Website</p>
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline flex items-center gap-1"
                      >
                        <span>
                          {member.website.replace(/^https?:\/\//, "")}
                        </span>
                        <LinkIcon size={14} />
                      </a>
                    </div>
                  )}

                  {member.socialLinks && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-4">Social Media</h3>
                      <div className="flex gap-4">
                        {Object.entries(member.socialLinks).map(
                          ([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-300 hover:text-green-400 capitalize"
                            >
                              {platform}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
